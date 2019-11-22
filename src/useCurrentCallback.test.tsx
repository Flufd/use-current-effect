import React from "react";
import { render, RenderOptions, fireEvent } from "@testing-library/react";
import { useCurrentCallback } from "./useCurrentCallback";

jest.useFakeTimers();

function renderStrict(component: React.ReactElement, options?: RenderOptions) {
  return render(<React.StrictMode>{component}</React.StrictMode>, options);
}

describe("useCurrentCallback", () => {
  it("Calls the callback when called", () => {
    // Set up a function to check was called inside the effect
    const innerCallback = jest.fn();
    const outerCallback = jest.fn();

    // Create a test component
    const TestHarness: React.FC<{ id: number }> = ({ id }) => {
      const callBack = useCurrentCallback(
        isCurrent => () => {
          outerCallback(id);
          setTimeout(() => {
            if (isCurrent()) {
              innerCallback(id);
            }
          }, 100);
        },
        [id]
      );
      return <button onClick={callBack}></button>;
    };

    const { container, getByRole } = renderStrict(<TestHarness id={1} />);

    // Click the button to trigger the callback
    fireEvent.click(getByRole("button"));

    expect(outerCallback).toHaveBeenCalledTimes(1);
    expect(outerCallback).toHaveBeenLastCalledWith(1);
    expect(innerCallback).toHaveBeenCalledTimes(0);

    // Resolve the timeout
    jest.advanceTimersByTime(150);

    expect(innerCallback).toHaveBeenCalledTimes(1);
    expect(innerCallback).toHaveBeenLastCalledWith(1);

    // Click the button to trigger the callback again
    fireEvent.click(getByRole("button"));

    // Change the id, and therefore the dependencies of the callback
    renderStrict(<TestHarness id={2} />, { container });

    // Resolve the timeout
    jest.advanceTimersByTime(150);

    // isCurrent() now returns false, so innerCallback will not fire
    expect(innerCallback).toHaveBeenCalledTimes(1);
    expect(innerCallback).toHaveBeenLastCalledWith(1);

  });
});

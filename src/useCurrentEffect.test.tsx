import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { useCurrentEffect } from "./useCurrentEffect";

jest.useFakeTimers();

function renderStrict(component: React.ReactElement, options? : RenderOptions) {
  return render(<React.StrictMode>{component}</React.StrictMode>, options);
}

describe("useCurrentEffect", () => {
  it("Calls the effect on initial render", () => {
    // Set up a function to check was called inside the effect
    const testEffect = jest.fn();

    // Create a test component
    const TestHarness = () => {
      useCurrentEffect(() => {
        testEffect();
      }, []);
      return <></>;
    };

    renderStrict(<TestHarness />);

    expect(testEffect).toHaveBeenCalled();
  });

  it("Calls the effect when the dependencies change", () => {
    const testEffect = jest.fn();

    const TestHarness: React.FC<{ id: number }> = ({ id }) => {
      useCurrentEffect(() => {
        testEffect();
      }, [id]);

      return <div>{id}</div>;
    };

    // Render 3 times with different id prop
    const { container } = renderStrict(<TestHarness id={1} />);
    renderStrict(<TestHarness id={2} />, { container });
    renderStrict(<TestHarness id={3} />, { container });

    expect(testEffect).toHaveBeenCalledTimes(3);
  });

  it("Does not call the effect when the dependencies don't change", () => {
    const testEffect = jest.fn();

    const TestHarness: React.FC<{ id: number }> = ({ id }) => {
      useCurrentEffect(() => {
        testEffect();
      }, [id]);

      return <div>{id}</div>;
    };

    // Render 2 times with the same id prop
    const { container } = renderStrict(<TestHarness id={1} />);
    renderStrict(<TestHarness id={1} />, { container });

    expect(testEffect).toHaveBeenCalledTimes(1);
  });

  it("Calls the cleanup function when the dependencies change", () => {
    const testCleanup = jest.fn();
    const testEffect = jest.fn(() => testCleanup);

    const TestHarness: React.FC<{ id: number }> = ({ id }) => {
      useCurrentEffect(() => {
        return testEffect();
      }, [id]);

      return <div>{id}</div>;
    };

    // Render 3 times with different id prop, once with the same
    const { container } = renderStrict(<TestHarness id={1} />);
    renderStrict(<TestHarness id={2} />, { container });
    renderStrict(<TestHarness id={3} />, { container });
    renderStrict(<TestHarness id={3} />, { container });

    expect(testCleanup).toHaveBeenCalledTimes(2);
  });

  it("Sets isCurrent result to false when the dependencies change", async () => {
    const spy = jest.fn();
    const effectSpy = jest.fn();

    const TestHarness: React.FC<{ id: number }> = ({ id }) => {
      useCurrentEffect(
        isCurrent => {
          effectSpy();
          setTimeout(() => {
            if (isCurrent()) {
              spy(id);
            }
          }, 100);
        },
        [id]
      );

      return <div>{id}</div>;
    };

    // Render with initial prop
    const { container } = renderStrict(<TestHarness id={1} />);
    // Render again with different id prop before the timeout is resolved
    renderStrict(<TestHarness id={2} />, { container });

    // Resolve the timeout
    jest.advanceTimersByTime(150);

    // The side effect that hasn't been protected should be called twice
    expect(effectSpy).toHaveBeenCalledTimes(2);

    // Spy should have only been called once, with second id
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);

  });
});

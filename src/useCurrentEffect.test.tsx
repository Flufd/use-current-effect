import React from "react";
import { render, getByTestId } from "@testing-library/react";

// A testing component for us
function TestHarness() {
  return <div data-testid="teste">Test</div>;
}

it("works", () => {
  const { container } = render(<TestHarness />);
  const testDiv : HTMLDivElement = getByTestId(container, "teste") as HTMLDivElement;
  expect(testDiv.textContent).toBe("Test");
});

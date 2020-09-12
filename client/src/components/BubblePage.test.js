import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

jest.mock("http://localhost:5000/api/colors");

test("Fetches data and renders the bubbles", async () => {
mockColors.mockResolvedValueOnce({
  data: {
    colors: ""
  }
})

const {getByText} = render(<BubblePage />);

const fetchcolors = getByText(/color/i);
fireEvent.click(fetchcolors)
  // Finish this test
  expect(mockColors).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(getAllByTestId(/colors/i)).toHaveLength(5))
});

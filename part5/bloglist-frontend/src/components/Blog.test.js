import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  it("renders blog's title and author initially but not url or number of likes", () => {
    const blog = {
      title: "test blog",
      author: "test author",
      url: "/test-url",
      likes: 0,
      user: {
        name: "jaycee",
      },
    };

    render(<Blog blog={blog} />);

    expect(screen.getByText("test blog test author")).toBeDefined();
    expect(screen.getByTestId("invisible")).toHaveStyle("display:none");
  });

  it("renders blog's url and likes when the view button is clicked", () => {
    const blog = {
      title: "test blog",
      author: "test author",
      url: "/test-url",
      likes: 0,
      user: {
        name: "jaycee",
      },
    };

    render(<Blog blog={blog} />);

    const button = screen.getByText("view");
    userEvent.click(button);

    expect(screen.getByTestId("invisible")).toHaveStyle("display:block");
  });
});

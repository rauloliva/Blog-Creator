/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages/admin/index";

describe("NewBlog Component", () => {
  test("renders home page", () => {
    render(<Index />);

    const textElement = screen.getByText("New Blog");
    expect(textElement).toBeInTheDocument();
  });
});

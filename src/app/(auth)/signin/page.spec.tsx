import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Signin from "./page";
import { ROUTES } from "@/config/routesConfig";
import AuthForm from "./AuthForm";

jest.mock("./AuthForm", () => jest.fn());

describe("Signin", () => {
  it("should render component correctly", () => {
    render(<Signin />);

    expect(screen.getByText("Signin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      ROUTES.SIGN_UP,
    );
    expect(AuthForm).toHaveBeenCalled();
  });
});

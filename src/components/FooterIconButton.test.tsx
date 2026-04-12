import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FooterIconButton from "./FooterIconButton";

const TestIcon = () => <svg data-testid="test-icon" />;

describe("FooterIconButton", () => {
  it("renders the icon", () => {
    render(
      <FooterIconButton
        onClick={vi.fn()}
        icon={<TestIcon />}
        ariaLabel="Test button"
      />
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("has the correct aria-label", () => {
    render(
      <FooterIconButton
        onClick={vi.fn()}
        icon={<TestIcon />}
        ariaLabel="Close dialog"
      />
    );

    expect(
      screen.getByRole("button", { name: "Close dialog" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <FooterIconButton
        onClick={handleClick}
        icon={<TestIcon />}
        ariaLabel="Test button"
      />
    );

    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when not clicked", () => {
    const handleClick = vi.fn();
    render(
      <FooterIconButton
        onClick={handleClick}
        icon={<TestIcon />}
        ariaLabel="Test button"
      />
    );

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies the className prop alongside base classes", () => {
    render(
      <FooterIconButton
        onClick={vi.fn()}
        icon={<TestIcon />}
        ariaLabel="Test button"
        className="extra-class"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("extra-class");
    expect(button).toHaveClass("rounded-full");
  });

  it("has type='button' to prevent accidental form submission", () => {
    render(
      <FooterIconButton
        onClick={vi.fn()}
        icon={<TestIcon />}
        ariaLabel="Test button"
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
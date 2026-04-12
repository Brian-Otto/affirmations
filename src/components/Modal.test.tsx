import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

vi.mock("../assets/icons/close-svgrepo-com.svg?react", () => ({
  default: () => <svg data-testid="close-icon" />,
}));

describe("Modal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders children", () => {
    render(
      <Modal onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders the close button with the correct aria-label", () => {
    render(<Modal onClose={onClose}>content</Modal>);

    expect(
      screen.getByRole("button", { name: "Dialogfenster schließen" }),
    ).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    render(<Modal onClose={onClose}>content</Modal>);

    await userEvent.click(screen.getByTestId("close-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", async () => {
    render(<Modal onClose={onClose}>content</Modal>);

    await userEvent.click(screen.getByTestId("backdrop"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal panel", async () => {
    render(
      <Modal onClose={onClose}>
        <p>inner</p>
      </Modal>,
    );

    await userEvent.click(screen.getByTestId("panel"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    render(<Modal onClose={onClose}>content</Modal>);

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose for other keys", async () => {
    render(<Modal onClose={onClose}>content</Modal>);

    await userEvent.keyboard("{Enter}");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("sets body overflow to hidden on mount", () => {
    render(<Modal onClose={onClose}>content</Modal>);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow to auto on unmount", () => {
    const { unmount } = render(<Modal onClose={onClose}>content</Modal>);
    unmount();

    expect(document.body.style.overflow).toBe("auto");
  });

  it("removes the keydown listener on unmount", async () => {
    const { unmount } = render(<Modal onClose={onClose}>content</Modal>);
    unmount();

    await userEvent.keyboard("{Escape}");

    expect(onClose).not.toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SWToast from "./SWToast.tsx";
import userEvent from "@testing-library/user-event";

vi.mock("react-hot-toast", () => ({
  default: {
    custom: vi.fn((renderFn) => {
      const { unmount } = render(renderFn({ id: "test-id", visible: true }));
      return { unmount };
    }),
    dismiss: vi.fn(),
  },
}));

vi.mock("../pwa", () => ({
  updateSW: vi.fn(),
}));

import toast from "react-hot-toast";
import { updateSW } from "../pwa";

function firePwaEvent(name: "pwa-update" | "pwa-offline-ready") {
  window.dispatchEvent(new Event(name));
}

describe("SWToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("pwa-update event", () => {
    it("shows the update toast when pwa-update fires", () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");

      expect(screen.getByText("Neue Version verfügbar. Jetzt neu laden?")).toBeInTheDocument();
    });

    it("dismisses the toast when Abbrechen is clicked", async () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");

      await userEvent.click(screen.getByText("Abbrechen"));

      expect(toast.dismiss).toHaveBeenCalledWith("test-id");
    });

    it("calls updateSW and dismisses when Neu laden is clicked", async () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");

      await userEvent.click(screen.getByText("Neu laden"));

      expect(updateSW).toHaveBeenCalledTimes(1);
      expect(toast.dismiss).toHaveBeenCalledWith("test-id");
    });
  });

  describe("pwa-offline-ready event", () => {
    it("shows the offline toast when pwa-offline-ready fires", () => {
      render(<SWToast />);
      firePwaEvent("pwa-offline-ready");

      expect(screen.getByText("App ist bereit für die Offline-Nutzung.")).toBeInTheDocument();
    });

    it("dismisses the toast when OK is clicked", async () => {
      render(<SWToast />);
      firePwaEvent("pwa-offline-ready");

      await userEvent.click(screen.getByText("OK"));

      expect(toast.dismiss).toHaveBeenCalledWith("test-id");
    });
  });

  it("removes event listeners on unmount", () => {
    const { unmount } = render(<SWToast />);
    unmount();

    firePwaEvent("pwa-update");
    firePwaEvent("pwa-offline-ready");

    expect(toast.custom).not.toHaveBeenCalled();
  });
});
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SWToast from "./SWToast.tsx";

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

vi.mock("../pwa", () => ({
  updateSW: vi.fn(),
}));

import { toast } from "sonner";
import { updateSW } from "../pwa";

const mockToastInfo = vi.mocked(toast.info);

function firePwaEvent(name: "pwa-update" | "pwa-offline-ready") {
  act(() => window.dispatchEvent(new Event(name)));
}

describe("SWToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("pwa-update event", () => {
    it("calls toast.info when pwa-update fires", () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");
      expect(mockToastInfo).toHaveBeenCalledTimes(1);
    });

    it("shows the correct message", () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");
      expect(mockToastInfo).toHaveBeenCalledWith("Neue Version verfügbar.", expect.objectContaining({
        duration: Infinity,
      }));
    });

    it("calls updateSW when Neu laden is clicked", () => {
      render(<SWToast />);
      firePwaEvent("pwa-update");
      const { action } = mockToastInfo.mock.calls[0][1] as any;
      action.onClick();
      expect(updateSW).toHaveBeenCalledTimes(1);
    });
  });

  describe("pwa-offline-ready event", () => {
    it("calls toast.info when pwa-offline-ready fires", () => {
      render(<SWToast />);
      firePwaEvent("pwa-offline-ready");
      expect(mockToastInfo).toHaveBeenCalledTimes(1);
    });

    it("shows the correct message", () => {
      render(<SWToast />);
      firePwaEvent("pwa-offline-ready");
      expect(mockToastInfo).toHaveBeenCalledWith("App ist bereit für die Offline-Nutzung.");
    });
  });

  it("removes event listeners on unmount", () => {
    const { unmount } = render(<SWToast />);
    unmount();
    firePwaEvent("pwa-update");
    firePwaEvent("pwa-offline-ready");
    expect(mockToastInfo).not.toHaveBeenCalled();
  });
});
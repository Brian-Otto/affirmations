import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useFooter from "./useFooter";

function makeInstallEvent() {
  return Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
    prompt: vi.fn().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome: "accepted" as const }),
  });
}

function fireBeforeInstallPrompt() {
  const event = makeInstallEvent();
  act(() => window.dispatchEvent(event));
  return event;
}

describe("useFooter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("activeModal", () => {
    it("starts as null", () => {
      const { result } = renderHook(() => useFooter());
      expect(result.current.activeModal).toBeNull();
    });

    it("updates when setActiveModal is called", () => {
      const { result } = renderHook(() => useFooter());
      act(() => result.current.setActiveModal("info"));
      expect(result.current.activeModal).toBe("info");
    });

    it("can be reset to null", () => {
      const { result } = renderHook(() => useFooter());
      act(() => result.current.setActiveModal("settings"));
      act(() => result.current.setActiveModal(null));
      expect(result.current.activeModal).toBeNull();
    });
  });

  describe("beforeinstallprompt", () => {
    it("deferredPrompt starts as null", () => {
      const { result } = renderHook(() => useFooter());
      expect(result.current.deferredPrompt).toBeNull();
    });

    it("sets deferredPrompt when beforeinstallprompt fires", () => {
      const { result } = renderHook(() => useFooter());
      const event = fireBeforeInstallPrompt();
      expect(result.current.deferredPrompt).toBe(event);
    });

    it("calls preventDefault on the event", () => {
      const { result: _ } = renderHook(() => useFooter());
      const event = fireBeforeInstallPrompt();
      expect(event.defaultPrevented).toBe(true);
    });

    it("removes the listener on unmount", () => {
      const { unmount } = renderHook(() => useFooter());
      unmount();
      const { result } = renderHook(() => useFooter());
      // fire after first hook is unmounted — second hook captures it, first does not
      act(() => fireBeforeInstallPrompt());
      expect(result.current.deferredPrompt).not.toBeNull();
    });
  });

  describe("handleInstall", () => {
    it("is a no-op when deferredPrompt is null", async () => {
      const { result } = renderHook(() => useFooter());
      await act(() => result.current.handleInstall());
      expect(result.current.deferredPrompt).toBeNull();
    });

    it("calls prompt() on the deferred event", async () => {
      const { result } = renderHook(() => useFooter());
      const event = fireBeforeInstallPrompt();
      await act(() => result.current.handleInstall());
      expect(event.prompt).toHaveBeenCalledTimes(1);
    });

    it("clears deferredPrompt after install", async () => {
      const { result } = renderHook(() => useFooter());
      fireBeforeInstallPrompt();
      await act(() => result.current.handleInstall());
      expect(result.current.deferredPrompt).toBeNull();
    });
  });
});

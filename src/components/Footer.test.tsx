import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "./Footer";

vi.mock("@/hooks/usePwaInstall");
vi.mock("./InfoDialog", () => ({ default: () => <div data-testid="info-dialog" /> }));
vi.mock("./QrDialog", () => ({ default: () => <div data-testid="qr-dialog" /> }));
vi.mock("./SettingsDialog", () => ({ default: () => <div data-testid="settings-dialog" /> }));

import usePwaInstall from "@/hooks/usePwaInstall";
const mockUsePwaInstall = vi.mocked(usePwaInstall);
const mockHandleInstall = vi.fn();

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePwaInstall.mockReturnValue({ deferredPrompt: null, handleInstall: mockHandleInstall });
  });

  it("renders the info dialog", () => {
    render(<Footer />);
    expect(screen.getByTestId("info-dialog")).toBeInTheDocument();
  });

  it("renders the QR dialog", () => {
    render(<Footer />);
    expect(screen.getByTestId("qr-dialog")).toBeInTheDocument();
  });

  it("renders the settings dialog", () => {
    render(<Footer />);
    expect(screen.getByTestId("settings-dialog")).toBeInTheDocument();
  });

  describe("install button", () => {
    it("is not rendered without a deferredPrompt", () => {
      render(<Footer />);
      expect(screen.queryByLabelText("App downloaden")).not.toBeInTheDocument();
    });

    it("is rendered when deferredPrompt is set", () => {
      mockUsePwaInstall.mockReturnValue({ deferredPrompt: {} as any, handleInstall: mockHandleInstall });
      render(<Footer />);
      expect(screen.getByLabelText("App downloaden")).toBeInTheDocument();
    });

    it("calls handleInstall when clicked", async () => {
      mockUsePwaInstall.mockReturnValue({ deferredPrompt: {} as any, handleInstall: mockHandleInstall });
      render(<Footer />);
      await userEvent.click(screen.getByLabelText("App downloaden"));
      expect(mockHandleInstall).toHaveBeenCalledTimes(1);
    });
  });
});
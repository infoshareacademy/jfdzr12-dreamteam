import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/atoms/ui/resizable";

export default function YourEvent() {
    return (
                <ResizablePanelGroup
                    direction="vertical"
                    className="min-h-[200px] max-w-md rounded-lg border"
                >
                    <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Your wedding is in...</span>
                    </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">...</span>
                    </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            )
}
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // Add a safety check for toasts
  if (!toasts || !Array.isArray(toasts)) {
    return (
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, open, onOpenChange, ...props }) {
        // Make sure we have an ID and we're properly passing the open state
        if (!id) return null;
        
        return (
          <Toast 
            key={id} 
            open={open} 
            onOpenChange={onOpenChange} 
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
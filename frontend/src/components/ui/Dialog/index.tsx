import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import styles from "./dialog.module.css"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
    <DialogPrimitive.Overlay ref={ref} className={styles.overlay} {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, style, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content ref={ref} className={styles.content} style={style as React.CSSProperties} {...props}>
            {children}
            <DialogPrimitive.Close asChild>
                <button className={styles.closeButton}>
                    <X style={{ width: 18, height: 18 }} />
                    <span style={{ position: "absolute", left: -9999 }}>Close</span>
                </button>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        style={{
            display: "grid",
            gap: 8,
            marginBottom: 24,
            ...(style || {}),
        }}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, color: "hsl(var(--foreground))" }}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", marginTop: 4 }}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}


'use client'

import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Asset} from '@/types/das'
import {NftDetails} from '@/components/das/nft-details'

interface NftDetailsDialogProps {
  open?: boolean
  children: React.ReactNode
  data: Asset
}

export function NftDetailsDialog({
  children,
  open,
  data,
}: NftDetailsDialogProps) {
  return (
    <Dialog defaultOpen={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-lg overflow-y-scroll safari-fallback">
        <NftDetails data={data.rawData} />
      </DialogContent>
    </Dialog>
  )
}

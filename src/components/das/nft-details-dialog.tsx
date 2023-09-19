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
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {DownloadIcon} from '@radix-ui/react-icons'
import {Asset} from '@/types/das'

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
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>NFT Details</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Image"
              className="h-auto w-full rounded-none flex-auto max-w-full basis-1/2"
            />
          }
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data.image} alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{data.name}</p>
              <p className="text-sm text-muted-foreground">{data.symbol}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button">
            <DownloadIcon className="mr-2" />
            Download Image
          </Button>
          <Button type="button">
            <DownloadIcon className="mr-2" />
            Download Animation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

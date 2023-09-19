import {MethodType} from '@/types/das'
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {RocketIcon} from '@radix-ui/react-icons'

interface FetchTimeSpentTextProps {
  timeSpentInMs: number
  methodType: MethodType
}

const thresholdInMs = 5000 // Example: 5 seconds. Adjust as needed.

export function FetchTimeSpentText({
  timeSpentInMs,
  methodType,
}: FetchTimeSpentTextProps) {
  let readableTime = ''
  let isExceedingThreshold = timeSpentInMs > thresholdInMs

  if (timeSpentInMs < 1000) {
    readableTime = `${timeSpentInMs.toLocaleString()} milliseconds`
  } else if (timeSpentInMs < 60000) {
    readableTime = `${(timeSpentInMs / 1000)
      .toFixed(2)
      .toLocaleString()} seconds`
  } else {
    readableTime = `${(timeSpentInMs / 60000)
      .toFixed(2)
      .toLocaleString()} minutes`
  }

  return (
    <div className="w-full max-w-full text-sm">
      <Alert>
        <RocketIcon className="h-4 w-4 !text-primary" />
        <AlertTitle>
          Experience unparalleled speed and efficiency with Helius!
        </AlertTitle>
        <AlertDescription>
          <p>
            This data {isExceedingThreshold ? 'was fetched' : 'fetched in just'}{' '}
            <strong className="text-primary">{readableTime}</strong> using the
            Helius DAS API&apos;s{' '}
            <span className="font-mono">`{methodType}`</span> method call.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}

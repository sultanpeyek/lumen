import {DataTable} from '@/components/das/data-table'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {extractData} from '@/lib/extract-data'
import {getAsset} from '@/lib/get-asset'

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({params}: PageProps) {
  const {id} = params

  let result = await getAsset(id)
  const extractedData = extractData([result])

  return (
    <div>
      {id}
      <DataTable data={[...extractedData]} openDialog />
      <Textarea defaultValue={JSON.stringify(result)} readOnly rows={10} />
      <div>{result?.timeSpent}</div>
    </div>
  )
}

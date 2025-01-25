import { TExpedition } from "@/components/shared/api/modules/events/events.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AllExpeditions({expeditions}:{expeditions:TExpedition[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expeditions.map((expedition,index:number) => {
        const date = expedition.expeditionDate as unknown;
        const convertedDate = new Date(date as string).toLocaleDateString().split('T')[0];
        return (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{expedition.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{expedition.description}</p>
            <p className="mt-2">Date: {convertedDate ?? "No date provided"}</p>
          </CardContent>
        </Card>
      )})}
    </div>
  )
}


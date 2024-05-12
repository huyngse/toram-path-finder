import { irunaWorldAreas } from "@/data/areas";
import { toramRegions } from "@/data/regions"

const Card = ({ data, startLocation }: any) => {
    const region = toramRegions.find(region => region.id == data.region);
    return (
        <div className="shadow rounded-lg p-3 bg-blue-900">
            <div className="font-bold">
                {data.name}
            </div>
            <div className="flex gap-5">
                <div className="text-sm">
                    <span className="font-semibold">World: </span>{region?.world}
                </div>
                <div className="text-sm">
                    <span className="font-semibold">Region: </span>{region?.name}
                </div>
            </div>

            <div>
                Path:
                {
                    data.paths.length == 0 ? (
                        <div className="text-green-500">
                            You can teleport to here
                        </div>
                    ) : (
                        <div>
                            {data.paths.map((path: any, index: number) => {
                                if (startLocation == 0) {
                                    return (
                                        <div key={`${data.id}-${index}`} className="text-red-600">
                                            {index + 1}.&nbsp;
                                            {
                                                path.map((node: any, innerIndex: number) => {
                                                    const area = irunaWorldAreas.find(a => a.id == node);
                                                    return (
                                                        <span key={`${data.id}-${index}-${innerIndex}`}>
                                                            {area?.name}
                                                            {innerIndex !== path.length - 1 && " > "}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                } else {
                                    const isInShortestPath = path.includes(startLocation);
                                    var startIndex = 0;
                                    if (isInShortestPath) {
                                        startIndex = path.indexOf(startLocation);
                                    }
                                    return (
                                        <div key={`${data.id}-${index}`} className="text-red-600">
                                            {index + 1}.&nbsp;
                                            {!isInShortestPath && "Teleport to "}
                                            {
                                                path.map((node: any, innerIndex: number) => {
                                                    const area = irunaWorldAreas.find(a => a.id == node);
                                                    if (innerIndex >= startIndex)
                                                    return (
                                                        <span key={`${data.id}-${index}-${innerIndex}`}>
                                                            {area?.name}
                                                            {innerIndex !== path.length - 1 && " > "}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Card
import { Avatar, Card } from "flowbite-react";
import { useMemo } from "react";
import { ICard } from "../app/(private)/board/[id]/types";
import { getCardColor } from "../lib/utils";

interface IProps {
  insight: ICard;
}
export function CardInsight({ insight }: IProps) {
  const color = useMemo(() => {
    return getCardColor(insight.color);
  }, [insight.color]);

  return (
    <Card className={`mb-2 ${color}`}>
      <div className="items-top flex space-x-4">
        <div className="shrink-0">
          <Avatar rounded />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {insight.id} - {insight.userName}
          </p>
          <p className="text-body py-2.5 text-sm">{insight.description}</p>
        </div>
      </div>
    </Card>
  );
}

import { Badge } from "flowbite-react";
import { UserStatus, type UserStatusType } from "./types";

interface UserBadgeProps {
  status: UserStatusType;
}

const BadgeRoleType = {
  [UserStatus.active]: "success",
  [UserStatus.pending]: "warning",
  [UserStatus.deleted]: "failure",
};

function getBadgeRoleText(status: UserStatusType) {
  switch (status) {
    case UserStatus.active:
      return "Ativo";
    case UserStatus.pending:
      return "Pendente";
    case UserStatus.deleted:
      return "Excluído";
  }
}

export function UserStatusBadge({ status }: UserBadgeProps) {
  return (
    <Badge className="inline-flex" color={BadgeRoleType[status]}>
      {getBadgeRoleText(status)}
    </Badge>
  );
}

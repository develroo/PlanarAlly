import { UuidMap } from "../../../store/shapeMap";
import { addGroupMembers, addNewGroup, removeGroup, removeGroupMember, updateGroupFromServer } from "../../groups";
import { groupToClient } from "../../models/groups";
import type { GroupJoinPayload, ServerGroup } from "../../models/groups";
import { socket } from "../socket";

socket.on("Group.Update", (data: ServerGroup) => {
    updateGroupFromServer(data);
});

socket.on("Group.Create", (data: ServerGroup) => {
    addNewGroup(groupToClient(data), false);
});

socket.on("Group.Join", (data: GroupJoinPayload) => {
    addGroupMembers(data.group_id, data.members, false);
});

socket.on("Group.Leave", (data: { uuid: string; group_id: string }[]) => {
    for (const member of data) {
        removeGroupMember(member.group_id, member.uuid, false);
    }
});

socket.on("Group.Remove", (data: string) => {
    removeGroup(data, false);
});

socket.on("Group.Members.Update", (data: { uuid: string; badge: number }[]) => {
    for (const { uuid, badge } of data) {
        const shape = UuidMap.get(uuid);
        if (shape === undefined) return;
        shape.badge = badge;
        shape.invalidate(true);
    }
});

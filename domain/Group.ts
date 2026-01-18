export interface GroupProps {
  group_id: number;
  name: string;
}

class Group {
  public readonly group_id: number;
  public readonly name: string;

  constructor({ group_id, name }: GroupProps) {
    this.group_id = group_id;
    this.name = name;
  }
}

export default Group;

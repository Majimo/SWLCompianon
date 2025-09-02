export type UnitProps = {
  id: number;
  name: string;
  points: number;
};

function Unit({ id, name, points }: UnitProps) {
    const unit = { id, name, points };
    return (
        <div>
            Unit Component = {unit.name}, Points = {unit.points}
        </div>
    );
}

export default Unit;

type UnitProps = {
  id: number;
};

function Unit({ id }: UnitProps) {
    const unit = { id, name: `Unit ${id}` };
    return <div>Unit Component = {unit.name}</div>;
}

export default Unit;

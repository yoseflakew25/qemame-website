interface TibebProps {
  flip?: boolean;
  foot?: boolean;
}

export default function Tibeb({ flip, foot }: TibebProps) {
  const cls = ['tibeb'];
  if (flip) cls.push('tibeb--flip');
  if (foot) cls.push('tibeb--foot');
  return <div className={cls.join(' ')} aria-hidden="true" />;
}

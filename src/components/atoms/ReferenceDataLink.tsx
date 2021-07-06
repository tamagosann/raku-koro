import { FC } from "react";

type ReferenceDataLinkProps = {
  label: string
  href: string
}

const ReferenceDataLink: FC<ReferenceDataLinkProps> = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener"
    >
      {props.label}
    </a>
  )
}
export default ReferenceDataLink
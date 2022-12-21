import { Breadcrumbs, Anchor } from "@mantine/core";

type BreadCrumbProps = {
  title: string;
  titlePath: string;
  subTitle: string;
  subTitlePath: string;
};

function BreadCrumb({
  title,
  titlePath,
  subTitle,
  subTitlePath,
}: BreadCrumbProps) {
  const items = [
    { title, href: titlePath },
    { title: subTitle, href: subTitlePath },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return <Breadcrumbs p="2rem">{items}</Breadcrumbs>;
}

export default BreadCrumb;

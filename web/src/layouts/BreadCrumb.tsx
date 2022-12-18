import { Breadcrumbs, Anchor } from "@mantine/core";

type BreadCrumbProps = {
  subTitle: string;
  subTitlePath: string;
};

function BreadCrumb({
  subTitle,
  subTitlePath,
}: BreadCrumbProps) {
  const items = [
    { title: 'Items', href: '/items' },
    { title: subTitle, href: subTitlePath },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return <Breadcrumbs p="2rem">{items}</Breadcrumbs>;
}

export default BreadCrumb;

export const filterItems = (value) => {
  const items = [
    {
      title: "Name",
      item: "name",
      value: value?.name,
    },
    {
      title: "Email",
      item: "email",
      value: value?.email,
    },
    {
      title: "Position",
      item: "position",
      value: value?.position,
    },
    {
      title: "Office",
      item: "office",
      value: value?.office,
    },
    {
      title: "Device",
      item: "device",
      value: value?.device,
    },
    {
      title: "Brand",
      item: "brand",
      value: value?.brand,
    },
    {
      title: "Model",
      item: "model",
      value: value?.model,
    },
    {
      title: "Serial No.",
      item: "serial",
      value: value?.serial,
    },
    {
      title: "Property No.",
      item: "property",
      value: value?.property,
    },
    {
      title: "Status",
      item: "status",
      value: value?.status,
    },
  ];
  return items;
};

import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on Shopaggator.",
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      label: "Payment Completed",
      type: "checkbox",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
      },
      // admin: {
      //   hidden: true,
      // },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};

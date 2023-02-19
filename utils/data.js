import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "john",
      email: "admin@example.com",
      password: bcrypt.hashSync("Password123"),
      isAdmin: true,
    },
    {
      name: "june",
      email: "user@example.com",
      password: bcrypt.hashSync("Password123"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Motor Chain",
      slug: "motor-chain",
      category: "Others",
      image: "/images/Yamaha-Chain-Sprocket.png",
      price: 1500,
      brand: "Yamaha",
      rating: 4.5,
      numReviews: 8,
      description: "Motor chain for yamaha ",
      countInStock: 5,
    },
    {
      name: "Motor pulsar",
      slug: "motor-pulsar",
      category: "Others",
      image: "/images/Pulsar.png",
      price: 1500,
      brand: "Kawasaki",
      rating: 4.5,
      numReviews: 8,
      description: "Motor pulsar for kawasaki",
      countInStock: 10,
    },
    {
      name: "Motor Mags",
      slug: "motor-mags",
      category: "mags",
      image: "/images/Mags.png",
      price: 1500,
      brand: "Honda",
      rating: 4.5,
      numReviews: 8,
      description: "Motor mags for Honda ",
      countInStock: 15,
    },
    {
      name: "Motor Pipe",
      slug: "motor-Pipe",
      category: "pipe",
      image: "/images/Yamaha-pipe.png",
      price: 1500,
      brand: "Yamaha",
      rating: 4.5,
      numReviews: 8,
      description: "Motor pipe for yamaha ",
      countInStock: 20,
    },
  ],
};

export default data;

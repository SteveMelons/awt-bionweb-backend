import React from "react";
import { useState } from "react";
import { useGetHelloWorld } from "../api";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data }] = useGetHelloWorld();

  return <p>{data}</p>;
};

export default Dashboard;

import { Box, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { User } from "../types/User";
import StudectCard from "./StudectCard";

interface PaginatingGridProps {
  users: User[];
  onLoadMore?: (newPagination: { limit: number; offset: number }) => void;
  initialLimit?: number;
  loadLimit?: number;
  reload?: any;
}

const PaginatingGrid: React.FC<PaginatingGridProps> = ({
  users,
  onLoadMore,
  initialLimit,
  loadLimit,
  reload,
}) => {
  const [pagination, setPagination] = useState({
    limit: initialLimit || 0,
    offset: 0,
  });

  useEffect(() => {
    setPagination({
      limit: initialLimit || 0,
      offset: 0,
    });
  }, [reload]);

  return (
    <Box
      sx={{
        width: "90%",
        margin: "2em auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(22em, 1fr))",
        gridAutoRows: "22em",
        gap: "1.3em",
      }}
    >
      {users.map((user, i) => (
        <StudectCard key={user.id} color={i % 3} user={user} />
      ))}
      {onLoadMore && initialLimit && loadLimit && (
        <Button
          onClick={async () => {
            const newPagination = {
              limit: loadLimit,
              offset: pagination.offset + pagination.limit,
            };
            setPagination(newPagination);
            onLoadMore(newPagination);
          }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default PaginatingGrid;

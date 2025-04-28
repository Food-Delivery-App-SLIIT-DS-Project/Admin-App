import { Badge } from "flowbite-react";
import React from "react";

type TransactionStateProps = {
  state: string;
};

function TransactionState({ state }: TransactionStateProps) {
  if (state === "PENDING") {
    return (
      <Badge className="max-w-30 flex justify-center" color="info" size="sm">
        Pending
      </Badge>
    );
  }
  if (state === "COMPLETED") {
    return (
      <Badge className="max-w-30 flex justify-center" color="success" size="sm">
        Completed
      </Badge>
    );
  }
  if (state === "FAILED") {
    return (
      <Badge className="max-w-30 flex justify-center" color="failure" size="sm">
        Failed
      </Badge>
    );
  }
  if (state === "REFUNDED") {
    return (
      <Badge className="max-w-30 flex justify-center" color="warning" size="sm">
        Refunded
      </Badge>
    );
  }
}

export default TransactionState;

import { Badge } from "flowbite-react";
import React from "react";

type VerificationTypeProps = {
  type: string;
};

function VerificationType({ type }: VerificationTypeProps) {
  if (type === "Restaurant") {
    return (
      <Badge className="max-w-30 flex justify-center" color="indigo" size="sm">
        Restaurant 
      </Badge>
    );
  }
  if (type === "Delivery Driver") {
    return (
      <Badge className="max-w-30 flex justify-center" color="purple" size="sm">
        Delivery Driver
      </Badge>
    );
  }
}

export default VerificationType;

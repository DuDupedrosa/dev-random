"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHouse } from "react-icons/fa6";
import Overview from "./Overview";

const buttonActiveStyle =
  "bg-violet-200 hover:bg-violet-200 cursor-pointer text-violet-500 text-sm font-medium w-full md:w-42 text-start items-start justify-start";
const buttonToActiveStyle =
  "block bg-transparent transition-all duration-300 hover:bg-violet-100 cursor-pointer shadow-none text-gray-600 text-sm w-full md:w-42 justify-start items-start text-start";

const docStepsEnum = {
  OVERVIEW: 1,
  AUTH: 2,
  GENERATE_DOCUMENT: 3,
};

const docStepsList = [
  {
    label: "Visão geral",
    value: docStepsEnum.OVERVIEW,
  },
  {
    label: "Autenticação",
    value: docStepsEnum.AUTH,
  },
  {
    label: "Gerar documento",
    value: docStepsEnum.GENERATE_DOCUMENT,
  },
];

export default function ApiDocument() {
  const [docStep, setDocStep] = useState<number>(docStepsEnum.OVERVIEW);

  return (
    <Card className="w-full max-w-[90%] md:max-w-[75%] shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
      <div className="px-8 mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2">
                <FaHouse />
                Página inicial
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="font-bold">
                Documentação da API
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <CardHeader className="space-y-2 hidden">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-[auto_1fr] gap-5">
          <div className="pr-5 border-b border-b-gray-400 pb-5 md:border-r md:border-b-transparent md:pb-0  md:border-r-gray-400 md:max-w-max">
            <ul className="flex flex-col gap-1">
              {docStepsList.map((step, i) => {
                return (
                  <li key={i}>
                    <Button
                      onClick={() => setDocStep(step.value)}
                      className={
                        docStep === step.value
                          ? buttonActiveStyle
                          : buttonToActiveStyle
                      }
                    >
                      {step.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>{docStep === docStepsEnum.OVERVIEW && <Overview />}</div>
        </div>
      </CardContent>
    </Card>
  );
}

import { CpuIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function Compute() {
  return (
    <div className=" mx-auto px-8 py-10 lg:mt-20">
      <div className="mb-4 rounded-full justify-center flex px-4 py-1.5 text-xs lg:text-sm font-medium">
        <CpuIcon className="h-14 w-14 text-primary" />
      </div>
      <div className="items-center flex justify-center gap-3">
        <p className="text-black md:text-3xl text-xl lg:text-3xl leading-[56px] font-bold">
          Compute Services
        </p>
      </div>
      <p className="text-xs lg:text-sm leading-[28px] text-neutral-400">
        Run your applications with unparalleled performance and flexibility. Our
        compute offerings range from virtual machines to serverless functions,
        designed for every scale and workload type.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <Card className="shadow-lg rounded-sm mt-4 text-left px-5">
          <CardContent>
            <CardTitle className="text-lg ">Virtual Machines (VMs)</CardTitle>

            <div className="overflow-x-auto text-left">
              <Table className="text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead>Instance Type</TableHead>
                    <TableHead>vCPUs</TableHead>
                    <TableHead>RAM</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      General Purpose
                    </TableCell>
                    <TableCell>2-64</TableCell>
                    <TableCell>4GB-256GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        Balanced
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Compute Optimized
                    </TableCell>
                    <TableCell>4-96</TableCell>
                    <TableCell>8GB-192GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        High Perf
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Memory Optimized
                    </TableCell>
                    <TableCell>4-128</TableCell>
                    <TableCell>32GB-512GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                        Memory
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GPU Instances</TableCell>
                    <TableCell>8-128</TableCell>
                    <TableCell>64GB-1TB+</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        Specialized
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-sm mt-4 text-left px-5">
          <CardContent>
            <CardTitle className="text-lg ">Virtual Machines (VMs)</CardTitle>

            <div className="overflow-x-auto text-left">
              <Table className="text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead>Instance Type</TableHead>
                    <TableHead>vCPUs</TableHead>
                    <TableHead>RAM</TableHead>

                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      General Purpose
                    </TableCell>
                    <TableCell>2-64</TableCell>
                    <TableCell>4GB-256GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        Balanced
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Compute Optimized
                    </TableCell>
                    <TableCell>4-96</TableCell>
                    <TableCell>8GB-192GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        High Perf
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Memory Optimized
                    </TableCell>
                    <TableCell>4-128</TableCell>
                    <TableCell>32GB-512GB</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                        Memory
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GPU Instances</TableCell>
                    <TableCell>8-128</TableCell>
                    <TableCell>64GB-1TB+</TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        Specialized
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

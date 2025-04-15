"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Clock, Plus, ExternalLink } from "lucide-react"

export default function JobsSection({ postedJobs, appliedJobs }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Tabs defaultValue="posted" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <TabsContent value="posted">
          <Card>
            <CardHeader>
              <CardTitle>Jobs & Internships You've Posted</CardTitle>
              <CardDescription>Manage your job listings and view applicants</CardDescription>
            </CardHeader>
            <CardContent>
              {postedJobs && postedJobs.length > 0 ? (
                <div className="space-y-4">
                  {postedJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-semibold">{job.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">{job.applicants} applicants</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't posted any jobs or internships yet</p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applied">
          <Card>
            <CardHeader>
              <CardTitle>Jobs & Internships You've Applied To</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              {appliedJobs && appliedJobs.length > 0 ? (
                <div className="space-y-4">
                  {appliedJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-semibold">{job.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={job.status === "Interview" ? "secondary" : "outline"}
                            className={
                              job.status === "Interview" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                            }
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {job.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Job
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't applied to any jobs or internships yet</p>
                  <Button variant="outline">Browse Open Positions</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

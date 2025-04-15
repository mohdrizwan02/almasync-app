"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function ConnectionsSection({ connections }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Your Connections</CardTitle>
              <CardDescription>People you've connected with</CardDescription>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Find Connections
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredConnections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConnections.map((connection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center p-4 border rounded-lg text-center hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={connection.profileImage || "/placeholder.svg"} alt={connection.name} />
                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{connection.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{connection.position}</p>
                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "No connections match your search" : "You don't have any connections yet"}
              </p>
              {!searchQuery && (
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find Alumni to Connect With
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

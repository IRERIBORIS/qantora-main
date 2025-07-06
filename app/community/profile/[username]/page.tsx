"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, LinkIcon, TrendingUp } from "lucide-react"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  const profile = {
    name: "Sarah Johnson",
    username: `@${username}`,
    bio: "Senior Market Analyst | 15+ years experience | Sharing insights on equity research and technical analysis",
    location: "New York, NY",
    joinDate: "Joined March 2020",
    website: "sarahtrading.com",
    followers: 12500,
    following: 342,
    posts: 1247,
    verified: true,
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">{profile.name}</h1>
          <p className="text-gray-600">{profile.posts} posts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gray-200 mx-auto mb-4"></div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="font-display font-bold text-xl">{profile.name}</h2>
                  {profile.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{profile.username}</p>
                <Button className="w-full mb-4">Follow</Button>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-gray-700">{profile.bio}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-blue-600">{profile.website}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{profile.joinDate}</span>
                </div>
              </div>

              <div className="flex justify-between text-center border-t pt-4">
                <div>
                  <div className="font-bold text-lg">{profile.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="font-bold text-lg">{profile.following.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div>
                  <div className="font-bold text-lg">{profile.posts.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display">Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Posts from {profile.name} will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Server, 
  Shield, 
  Database, 
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  HardDrive,
  Cpu,
  Activity,
  Globe,
  Key,
  FileText,
  RefreshCw
} from "lucide-react";

const SystemAdmin = () => {
  const servers = [
    {
      id: "web-01",
      name: "Web Server",
      status: "healthy",
      cpu: 45,
      memory: 62,
      uptime: "15d 8h 32m",
      lastBackup: "2 hours ago"
    },
    {
      id: "db-01", 
      name: "Database Server",
      status: "healthy",
      cpu: 78,
      memory: 85,
      uptime: "15d 8h 32m",
      lastBackup: "30 minutes ago"
    },
    {
      id: "api-01",
      name: "API Server", 
      status: "warning",
      cpu: 92,
      memory: 88,
      uptime: "15d 8h 32m",
      lastBackup: "1 hour ago"
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: "Failed Login",
      severity: "medium",
      description: "Multiple failed login attempts detected from IP 192.168.1.100",
      timestamp: "2 minutes ago",
      status: "active"
    },
    {
      id: 2,
      type: "System Update",
      severity: "low", 
      description: "Security updates available for system packages",
      timestamp: "1 hour ago",
      status: "pending"
    },
    {
      id: 3,
      type: "Backup Failure",
      severity: "high",
      description: "Scheduled backup failed for database server",
      timestamp: "3 hours ago", 
      status: "resolved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      case "offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-3 rounded-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
              <p className="text-muted-foreground">Monitor, manage, and secure your infrastructure</p>
            </div>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Operational</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <HardDrive className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="servers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-6">
            <div className="grid gap-6">
              {servers.map((server) => (
                <Card key={server.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Server className="h-5 w-5" />
                          {server.name}
                        </CardTitle>
                        <CardDescription>
                          ID: {server.id} • Uptime: {server.uptime}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(server.status)}>
                        {server.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">CPU Usage</span>
                          </div>
                          <span className="font-medium">{server.cpu}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${server.cpu > 80 ? 'bg-red-500' : server.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${server.cpu}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Memory Usage</span>
                          </div>
                          <span className="font-medium">{server.memory}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${server.memory > 80 ? 'bg-red-500' : server.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${server.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Backup</span>
                          <span className="text-sm">{server.lastBackup}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Restart
                          </Button>
                          <Button size="sm" variant="outline">
                            <Monitor className="h-4 w-4 mr-2" />
                            Monitor
                          </Button>
                          <Button size="sm" variant="outline">
                            <Database className="h-4 w-4 mr-2" />
                            Backup Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Alerts
                  </CardTitle>
                  <CardDescription>Monitor system security and access logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityAlerts.map((alert) => (
                      <div key={alert.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{alert.type}</span>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                        </div>
                        <div className="flex gap-2">
                          {alert.status === "active" && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Resolve
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Access Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch id="two-factor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity</p>
                      </div>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ip-restriction">IP Restriction</Label>
                        <p className="text-sm text-muted-foreground">Restrict admin access to specific IP ranges</p>
                      </div>
                      <Switch id="ip-restriction" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="backups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Management
                </CardTitle>
                <CardDescription>Schedule and manage system backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Daily Backups</h4>
                      <p className="text-sm text-muted-foreground mb-2">Database and files</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Enabled</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Weekly Backups</h4>
                      <p className="text-sm text-muted-foreground mb-2">Full system backup</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Enabled</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Cloud Storage</h4>
                      <p className="text-sm text-muted-foreground mb-2">AWS S3 backup</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Connected</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-gradient-primary">
                      <Database className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Backup Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-updates">Auto Updates</Label>
                        <p className="text-sm text-muted-foreground">Automatically install security updates</p>
                      </div>
                      <Switch id="auto-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="monitoring">System Monitoring</Label>
                        <p className="text-sm text-muted-foreground">Enable real-time monitoring</p>
                      </div>
                      <Switch id="monitoring" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Performance Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                      <p className="text-sm text-muted-foreground mb-2">Time to live for cached data</p>
                      <div className="text-2xl font-bold">3600</div>
                    </div>
                    <div>
                      <Label htmlFor="max-connections">Max Database Connections</Label>
                      <p className="text-sm text-muted-foreground mb-2">Maximum concurrent database connections</p>
                      <div className="text-2xl font-bold">100</div>
                    </div>
                    <div>
                      <Label htmlFor="log-retention">Log Retention (days)</Label>
                      <p className="text-sm text-muted-foreground mb-2">How long to keep system logs</p>
                      <div className="text-2xl font-bold">30</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemAdmin;





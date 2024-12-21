import { Card, CardContent } from "../ui/card";

export default function CallbackCard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="space-y-6 p-8">
        <div className="text-center  space-y-4">
          <h2 className="text-2xl text-main font-semibold">Completing authentication</h2>
        </div>

        <div className="text-center pt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
        </div>
      </CardContent>
    </Card>
  );
}

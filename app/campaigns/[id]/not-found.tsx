import { EmptyState } from "@/components/shared/empty-state";

export default function CampaignNotFound() {
  return (
    <div className="p-6 md:ml-64">
      <EmptyState
        title="Campaign Not Found"
        description="The campaign you're looking for doesn't exist or has been removed."
        icon="default"
        showReset={false}
      />
    </div>
  );
}
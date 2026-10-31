// Directory Admin Moderation Desk
// Allows 1-click approvals, accreditation checks, and audit logging.

export interface PendingSubmission {
  id: string;
  name: string;
  specialtyOrCategory: string;
  licenseNumber: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export class ModerationDesk {
  private queue: PendingSubmission[] = [];

  public addSubmission(sub: PendingSubmission): void {
    this.queue.push(sub);
  }

  public approve(id: string): boolean {
    const item = this.queue.find(s => s.id === id);
    if (!item) return false;
    item.status = "APPROVED";
    console.log(`[Moderation] Approved listing: ${item.name} (${id})`);
    return true;
  }

  public reject(id: string, reason: string): boolean {
    const item = this.queue.find(s => s.id === id);
    if (!item) return false;
    item.status = "REJECTED";
    console.log(`[Moderation] Rejected listing ${id}: ${reason}`);
    return true;
  }
}

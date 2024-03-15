export interface Block {
  time_created: string;
  result: string;
  result_determined_at: string;
  service_area_name: string;
  overall_pay: string;
  hourly_pay: string;
  block_start_time: string;
  block_end_time: string;
  block_time_in_minutes: string;
  block_rejection_reasons?: BlockRejectionReason[];
  status?:string
  charged?:string | null
  external_uid? :string 
}

interface BlockRejectionReason {
  reason: string;
  block_service_area_name: string;
  block_overall_pay: string;
  block_hourly_pay: string;
  block_time_in_minutes: string;
  block_lead_time_in_minutes: string;
  block_start_time: string;
  block_end_time: string;
  settings_min_lead_time: number;
  settings_min_block_time: number;
  settings_max_block_time: number;
  settings_min_overall_pay: number;
  settings_min_hourly_pay: number;
  settings_time_filters_start_time: string;
  settings_time_filters_end_time: string;
  service_area_is_custom_filters_enabled: boolean;
}


export interface Pagination {
  page?: number;
  size?: number;
  total_items?: number;
  current_page?: number;
}

export interface SearchHistory extends Pagination {
  result: string

}
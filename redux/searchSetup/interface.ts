export interface Locations {
    is_custom_filters_enabled: boolean
    is_selected: boolean
    name?: string
    uid: string
}

export interface SearchSettings {
    delay?: any;
    auto_resume?: any;
    resume_at_estimation?: any;
    is_auto_resume_paused?: any;
    show_auto_resume_countdown?: any;
    min_lead_time?: any;
    min_hourly_pay?: any;
    min_overall_pay?: any;
    min_block_time?: number;
    max_block_time?: number; 
    solve_captcha?: any;
    enable_time_filters?: any;
    monday_enabled?: any;
    monday_start?: any;
    monday_end?: any;
    tuesday_enabled?: any;
    tuesday_start?: any;
    tuesday_end?: any;
    wednesday_enabled?: any;
    wednesday_start?: any;
    wednesday_end?: any;
    thursday_enabled?: any;
    thursday_start?: any;
    thursday_end?: any;
    friday_enabled?: any;
    friday_start?: any;
    friday_end?: any;
    saturday_enabled?: any;
    saturday_start?: any;
    saturday_end?: any;
    sunday_enabled?: any;
    sunday_start?: any;
    sunday_end?: any;
    [key: string]: any;
}


export interface CreateOrUpdateSchedule {
    should_start_at: string
}
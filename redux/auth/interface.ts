export interface RequestOtp {
    method: "email" | "telegram",
    email: string
    recaptcha_token: string
}




export interface VerifyOtp {
    email: string
    otp: string
}

export interface SignUp {
    login_result: string
    recaptcha_token: string
    referral_code: string
}



export interface User {
    id?: string;
    timezone?: string
    username?: string
    email?: string
    timezone_dropdown_options?: string[]
    iana?: string
    marketing_opt_in?:boolean
    telegram_external_uid?:string
    telegram_sync_status?:boolean
}

export interface UpdateUser {
    timezone?:string
    marketing_opt_in?:boolean
    
}
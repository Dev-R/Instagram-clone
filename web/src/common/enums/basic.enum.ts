/**
 * Screen breakpoints based on width
 */
export enum ScreenBreakpoint {
    Small = 640,    // Up to 640px width
    Medium = 768,   // Up to 768px width
    Large = 1024,   // Up to 1024px width
    ExtraLarge = 1280  // Up to 1280px width
}

/** Enum for basic color */
export enum BasicColor {
    /** Default color */
    DEFAULT = 'sky',

    /** Success color */
    SUCCESS = 'green',

    /** Info color */
    INFO = 'indigo',

    /** Warning color */
    WARNING = 'yellow',

    /** Danger color */
    DANGER = 'red',

    /** Outline with default color */
    OUTLINE  = 'outline', 
    
    /** Light color */
    LIGHT = 'light',

    /** Dark color */
    DARK = 'dark'
}

/** Enum for modal size */
export enum ModalSize {
    /** Super extra small modal size */
    SuperSmall = 'ss',

    /** Extra small modal size */
    ExtraSmall = 'xs',
    
    /** Small modal size */
    Small = 'sm',

    /** Medium modal size */
    Medium = 'md',

    /** Large modal size */
    Large = 'lg',

    /** Extra large modal size */
    ExtraLarge = 'xl'
}


/** Enum for modal types */
export enum ModalName {
    FOLLOW = 'follow-modal', // Represents the follow modal
    PROFILE = 'profile-modal', // Represents the profile modal
    SETTING = 'setting-modal', // Represents the setting modal
    COMMENT = 'comment-modal', // Represents the comment modal
    GENDER = 'gender-modal' // Represents the gender modal
}

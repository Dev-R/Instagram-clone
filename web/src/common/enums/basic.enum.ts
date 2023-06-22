/**
 * Screen breakpoints based on width
 */
export enum ScreenBreakpoint {
    Small = 640,    // Up to 640px width
    Medium = 768,   // Up to 768px width
    Large = 1024,   // Up to 1024px width
    ExtraLarge = 1280  // Up to 1280px width
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
export enum ModalType {
    /** Comment Modal */
    Comment = 'comment',

    /** Follow Modal */
    Follow = 'follow'
}

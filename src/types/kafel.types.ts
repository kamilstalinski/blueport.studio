export type BuildStage = 0 | 1 | 2 | 3;

export type BuildFrame = { at: number; stage: BuildStage; wiresOn: number; barsOn: number };

export type BuildCycle = BuildFrame & { site: number };

export type FramePan = { shift: number; seconds: number };


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { LanguageModelToolInformation } from 'vscode';
import { IConfigurationService } from '../../../../platform/configuration/common/configurationService';
import { IExperimentationService } from '../../../../platform/telemetry/common/nullExperimentationService';
import { IInstantiationService } from '../../../../util/vs/platform/instantiation/common/instantiation';
import { computeToolGroupingMinThreshold, ToolGrouping } from './toolGrouping';
import { IToolGrouping, IToolGroupingService } from './virtualToolTypes';

export class ToolGroupingService implements IToolGroupingService {
	declare readonly _serviceBrand: undefined;

	constructor(
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		@IConfigurationService private readonly _configurationService: IConfigurationService,
		@IExperimentationService private readonly _experimentationService: IExperimentationService
	) { }

	public get threshold() {
		return computeToolGroupingMinThreshold(this._experimentationService, this._configurationService);
	}

	create(tools: readonly LanguageModelToolInformation[]): IToolGrouping {
		return this._instantiationService.createInstance(ToolGrouping, tools);
	}
}
